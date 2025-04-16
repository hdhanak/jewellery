"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentPushNotification = void 0;
var FCM = require('fcm-node');
var APN = require('apn');
const env_1 = require("../../env");
const logger_1 = require("../lib/logger");
const fcm = new FCM(env_1.env.FCM_SERVER_KEY);
/**
 * push notification
 * * @param {string} value
*/
function sentPushNotification(dataObj, callback) {
    if (dataObj['deviceType'] === "Android") {
        sentAndroidPush(dataObj, callback);
    }
    else if (dataObj['deviceType'] === "Ios") {
        sentApplePush(dataObj, callback);
    }
}
exports.sentPushNotification = sentPushNotification;
/**
 * push notification android
 * * @param {string} value
*/
const sentAndroidPush = (dataObj, callback) => {
    var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: dataObj['registrationDeviceToken'],
        collapse_key: env_1.env.SITE_TITLE,
        notification: {
            title: dataObj['title'],
            body: dataObj['body']
        },
        data: {
            id: dataObj['id'],
            url: dataObj['url'],
            redirectType: dataObj['redirectType']
        }
    };
    fcm.send(message, function (err, response) {
        if (err) {
            logger_1.logger.error(err);
            callback(err);
        }
        else {
            logger_1.logger.info(response);
            callback(response);
        }
    });
};
/**
 * push notification Apple
 * * @param {string} value
*/
const sentApplePush = (dataObj, callback) => {
    let self = this;
    let options = {
        token: {
            key: "",
            keyId: "DV2NAKPY5W",
            teamId: "3FR26TP83Y",
        },
        production: false
    };
    let redirectType = dataObj['redirectType'];
    let apnProvider = new APN.Provider(options);
    let note = new APN.Notification();
    let notificationSound = "SIMPLE_NOTIFICATION_APP_IN_BACKGROUND.caf";
    note.badge = 1;
    note.alert = dataObj['body'];
    note.payload = dataObj;
    note.sound = notificationSound;
    note.topic = "com.lms.petApp"; // BUNDEL ID
    apnProvider.send(note, dataObj['registrationDeviceToken']).then((result) => {
        console.log('result', JSON.stringify(result));
        callback(result);
    });
};
