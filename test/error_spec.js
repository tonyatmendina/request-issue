var _ = require("lodash")
var http = require("http")
var assert = require("assert")
var fs = require("fs")

describe("The web service that is always unauthorized", function () {

    var app = require("../app")
    var server
    var port = _.random(50000, 60000)
    var baseURL = "http://localhost:" + port.toString()
    var request = require("request")

    before(function () {
        server = http.createServer(app)
        server.listen(port)
    })

    after(function () {

        //close listening server
        server.close()

    })

    it("rejects a GET", function (done) {
        request({
            method: "GET",
            uri: baseURL + "/errorpath"
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects a PUT with a simple body", function (done) {
        request({
            method: "PUT",
            uri: baseURL + "/errorpath",
            json: true,
            body: { value: "invalid test idea" }
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects a PUT with form data but no file", function (done) {

        var formData = {
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "PUT",
            uri: baseURL + "/errorpath",
            json: true,
            formData: formData
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects a POST with a simple body", function (done) {
        request({
            method: "POST",
            uri: baseURL + "/errorpath",
            json: true,
            body: { value: "invalid test idea" }
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })


    it("rejects a POST with form data but no file", function (done) {

        var formData = {
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "POST",
            uri: baseURL + "/errorpath",
            json: true,
            formData: formData
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects a DELETE with a simple body", function (done) {
        request({
            method: "DELETE",
            uri: baseURL + "/errorpath"
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects an unauthorized POST with a multipart/form-data body", function (done) {

        //PROBLEM: ECONNRESET is returend in an error object, instead of no error and a status of 401

        var formData = {
            newContentImage: fs.createReadStream('./test/uploads/American_White_Pelican_small.jpg'),
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "POST",
            uri: baseURL + "/errorpath",
            formData: formData,
            json: true
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects an unauthorized PUT with a multipart/form-data body", function (done) {

        //PROBLEM: ECONNRESET is returend in an error object, instead of no error and a status of 401

        var formData = {
            newContentImage: fs.createReadStream('./test/uploads/American_White_Pelican_small.jpg'),
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "PUT",
            uri: baseURL + "/errorpath",
            formData: formData,
            json: true
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects an unauthorized POST with a multipart/form-data body and a plain-text entity body", function (done) {

        //PROBLEM: ECONNRESET is returend in an error object, instead of no error and a status of 401

        var formData = {
            newContentImage: fs.createReadStream('./test/uploads/American_White_Pelican_small.jpg'),
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "POST",
            uri: baseURL + "/errorpath2",
            formData: formData
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })

    it("rejects an unauthorized PUT with a multipart/form-data body and a plain-text entity body", function (done) {

        //PROBLEM: ECONNRESET is returend in an error object, instead of no error and a status of 401

        var formData = {
            newContentImage: fs.createReadStream('./test/uploads/American_White_Pelican_small.jpg'),
            name: "budget town hall",
            tags: "budget,town,hall,pegasus,restored,reunion,tower"
        }

        request({
            method: "PUT",
            uri: baseURL + "/errorpath2",
            formData: formData
        }, function (error, response) {
            if (error) {
                console.error(error)
            }
            assert(!error)
            assert.strictEqual(response.statusCode, 401)
            done()
        })
    })


})