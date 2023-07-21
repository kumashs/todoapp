"use strict";
const axios = require('axios')
const CommonService = {
    list: async function (Model, filter = {}, select = {}, sort = { _id: 1 }) {
        let data = null;

        try {
            data = await Model.find(filter)
                .select(select)
                .sort(sort)
                .read("secondaryPreferred")
                .lean();
        } catch (e) {
            console.log(e);
        }

        return data;
    },

    listInBatch: async function (
        Model,
        filter = {},
        select = {},
        sort = { _id: 1 },
        skip,
        limit
    ) {
        let data = null;

        try {
            data = await Model.find(filter)
                .select(select)
                .sort(sort)
                .read("secondaryPreferred")
                .skip(skip)
                .limit(limit)
                .lean();
        } catch (e) {
            console.log(e);
        }

        return data;
    },

    listUsingAggregate: async function (Model, filter) {
        let data = [];

        try {
            data = await Model.aggregate(filter).read("secondaryPreferred");
        } catch (e) {
            console.log(e);
        }

        return data;
    },

    create: async function (Model, createObject) {
        let data = null;

        try {
            let storeData = new Model(createObject);
            data = await storeData.save();
        } catch (error) {
            console.error(error);
        }

        return data;
    },

    updateOne: async function (
        Model,
        filter,
        update,
        options = { upsert: true, new: true }
    ) {
        let data = [];

        try {
            data = await Model.findOneAndUpdate(filter, update, options);
        } catch (e) {
            console.log(e);
        }

        return JSON.parse(JSON.stringify(data));
    },

    updateMany: async function (Model, filter, update) {
        let data = [];

        try {
            data = await Model.updateMany(filter, update);
        } catch (e) {
            console.log(e);
        }

        return data;
    },

    getAndUpdate: async function (Model, counterName) {
        let data = 0;

        try {
            let counterSeq = await Model.findOneAndUpdate(
                { counterName: counterName },
                { $inc: { counterSeq: 1 } },
                { new: true }
            ).lean();

            data = counterSeq.counterSeq;
        } catch (error) {
            console.log(error);
        }

        return data;
    },
    getAndUpdate: async function (Model, counterName) {
        let data = 0;

        try {
            let counterSeq = await Model.findOneAndUpdate(
                { counterName: counterName },
                { $inc: { counterSeq: 1 } },
                { new: true }
            ).lean();

            data = counterSeq.counterSeq;
        } catch (error) {
            console.log(error);
        }

        return data;
    },
    deleteMany : async function(Model,filter){
        let deleteData = [];
        try{
             deleteData = await Model.deleteMany(filter);
        }catch(error){
            console.log(error)
        }
        return deleteData;
    },
    uploadImage: async (typeName, imageBase64) => {
        let data = JSON.stringify({
            typeName: typeName,
            imageData: imageBase64,
        });
        let config = {
            method: "post",
            url: "https://core-beta.coutloot.com/x38/v-0-2/core-apis/images/uploadImage",
            headers: {
                authToken: "WFdbKBSuFFwENAHnQt2B",
                authType: "INTERNAL_API",
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            let response = await axios(config);
            response = response.data;
            if (response.success == 1) {
                return response.data;
            } else {
                console.log("Error in image upload");
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = CommonService;
