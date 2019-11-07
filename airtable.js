var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);
var marked = require("marked");
module.exports = class short {
    constructor(id, pass, url, markdown,res) {
        if (!id) {return null};
        this.id = id;
        this.passwd = pass;
        this.url = url;
        this.markdown = markdown;
        let there = false;
        let rec = "";
        base('shorts').select({
            view: "Grid view"
        }).eachPage( (records, fetchNextPage) => {
            records.forEach((record) => {
                if (record.get("ID") == this.id) {
                    there = true;
                    rec = record;
                }
            });
            fetchNextPage();
        }, () => {
            if (!there) {
                this.verified = true;
                base('shorts').create([
                    {
                        "fields": {
                            "ID": this.id,
                            "content": this.markdown,
                            "pass": this.passwd,
                            "uri": this.url
                        }
                    }],() => res.redirect("/"+this.id));
            } else if (rec.get("pass") == this.passwd) {
                this.verified = true;
                base('shorts').update([
                    {
                      "id": rec.getId(),
                      "fields": {
                        "ID": this.id,
                        "content": this.markdown,
                        "pass": this.passwd,
                        "uri":this.url
                      }
                    }], () => res.redirect("/"+this.id));
            } else {
                res.send("This record is taken and your password did not match");
            }
        });
        
    }
    retrieve (id,callback) {
        var triggered = false;
        base('shorts').select({
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                if (record.get("ID") == id) {
                    this.id = id;
                    this.markdown = record.get("content");
                    this.passwd = record.get("pass");
                    this.url = record.get("uri");
                    triggered = true;
                }
            });
            fetchNextPage();
        },() => {
            callback(this,triggered);
        });
    }
    render () {
        return marked(this.markdown);
    }
    isVerified () {
        return this.verified;
    }
}