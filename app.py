import os
import pandas as pd
import numpy as np
import requests, json
from flask import Flask, jsonify, render_template, redirect
from flask_pymongo import PyMongo




#################################################
# Database Setup
#################################################

app = Flask(__name__)
mongo = PyMongo(app, uri ="mongodb://ds131737.mlab.com:31737/heroku_2xs5kb65",
                            username = os.environ['dbuser'],
                            password = os.environ['auth'],
                            authSource = os.environ['authSource'],
                            authMechanism = os.environ['authMech'])



@app.route("/")
def index():
    """Return the homepage."""
    stations = mongo.db.stations.find_one()
    return render_template("index.html", stations=stations)


@app.route("/stations")
def stationlist():
    stations = mongo.db.stations.find()
    result= {}
    svclines = {}
    for station in stations:
        holdlines = []
        if station['LineCode1'] != None:
            holdlines.append(station['LineCode1'])
        if station['LineCode2'] != None:
            holdlines.append(station['LineCode2'])
        if station['LineCode3'] != None:
            holdlines.append(station['LineCode3'])    
        if station['LineCode4'] != None:
            holdlines.append(station['LineCode4'])
        svclines.update({station['Code']:holdlines})

    stations = mongo.db.stations.find()
    for station in stations: 
        stgthr1 = station['StationTogether1']
        stgthr2 = station['StationTogether2']
        tgtstn = station['Code']
        if stgthr1 != "":
            svclines[tgtstn].extend(svclines[stgthr1])
        if stgthr2 != "":
            svclines[tgtstn].extend(svclines[stgthr2])
            
        result.update({station['Code']:{"name":station['Name'],
                                        "code":station['Code'],
                                        "lat":station['Lat'],
                                        "lng":station['Lon'],
                                        "svclines":svclines[station['Code']],
                                        "address":station['Address'],
                                        }})
                        
    return jsonify(result)


@app.route("/stations/<code>")
def stationinfo(code):
    station = mongo.db.stations.find({'Code':f"{code}"}) 
    holdlines = []
    stationtog1 = station[0]['StationTogether1']
    stationtog2 = station[0]['StationTogether2']

    if station[0]['LineCode1'] != None:
        holdlines.append(station[0]['LineCode1'])
    if station[0]['LineCode2'] != None:
        holdlines.append(station[0]['LineCode2'])
    if station[0]['LineCode3'] != None:
        holdlines.append(station[0]['LineCode3'])    
    if station[0]['LineCode4'] != None:
        holdlines.append(station[0]['LineCode4']) 
    
    if stationtog1 != "":
        station1 = mongo.db.stations.find({'Code':f"{stationtog1}"})
        if station1[0]['LineCode1'] != None:
            holdlines.append(station1[0]['LineCode1'])
        if station1[0]['LineCode2'] != None:
            holdlines.append(station1[0]['LineCode2'])
        if station1[0]['LineCode3'] != None:
            holdlines.append(station1[0]['LineCode3'])    
        if station1[0]['LineCode4'] != None:
            holdlines.append(station1[0]['LineCode4'])
    if stationtog2 != "":
        station2 = mongo.db.stations.find({'Code':f"{stationtog2}"})
        if station2[0]['LineCode1'] != None:
            holdlines.append(station2[0]['LineCode1'])
        if station2[0]['LineCode2'] != None:
            holdlines.append(station2[0]['LineCode2'])
        if station2[0]['LineCode3'] != None:
            holdlines.append(station2[0]['LineCode3'])    
        if station2[0]['LineCode4'] != None:
            holdlines.append(station2[0]['LineCode4'])
            
    result = {"name":station[0]['Name'],
            "code":station[0]['Code'],
            "address":station[0]['Address'],
            "svclines":holdlines,
            "stationtogether1": station[0]['StationTogether1'],
            "stationtogether2": station[0]['StationTogether2'],
            "lat": station[0]['Lat'],
            "lng": station[0]['Lon']}

    predict_url = f'https://api.wmata.com/StationPrediction.svc/json/GetPrediction/'
    params = {"api_key":os.environ['metro_api']}
    trains1 = requests.get(f'{predict_url}{code}', params=params).json()
    result['trains1'] = trains1['Trains']

    result['trains2'] = {}
    if station[0]['StationTogether1'] != "":
        code = station[0]['StationTogether1']
        altplatform = requests.get(f'{predict_url}{code}', params=params).json()
        result['trains2'] = altplatform['Trains']

    return jsonify(result)

  

# @app.route("/incidents")
# def getIncidents():
#     rail_inci_url = "https://api.wmata.com/Incidents.svc/json/Incidents"
#     elev_inci_url = "https://api.wmata.com/Incidents.svc/json/ElevatorIncidents"
#     bus_inci_url = "https://api.wmata.com/Incidents.svc/json/BusIncidents"




@app.route("/buspositions")
def getBusPositions():
    bus_loc_url = "https://api.wmata.com/Bus.svc/json/jBusPositions"
    params = {"api_key":os.environ['metro_api']}
    bus_positions = requests.get(bus_loc_url, params=params).json()

    return jsonify(bus_positions)

@app.route("/activebusroutes")
def getActiveBus():
    bus_loc_url = "https://api.wmata.com/Bus.svc/json/jBusPositions"
    params = {"api_key":os.environ['metro_api']}
    response = requests.get(bus_loc_url, params=params).json()
    buspos = response['BusPositions']
    activelines = []
    for bus in buspos:
        if bus['RouteID'] not in activelines:
            activelines.append(bus['RouteID'])
    return jsonify(activelines)






if __name__ == "__main__":
    app.run()
