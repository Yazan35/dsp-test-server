jsonfile = require('jsonfile');
path = require('path');
const uuidv4 = require('uuid/v4');
const config = require("config");


function GenerateBidResponse(reqId, bidPrice, seatName, isVideo, isWrapper) {
  let adm = "<span class=\"PubAPIAd\"  id=\"26CBB86E-9A45-48C2-AB1D-E6FB65E63216\"><script type='text/javascript' src='https://lyr.pubmatic.com/AdServer/layer?pubid=158651&nwid=158651&ts=1582158644&cid=23169&pimprid=538-97c78bdf5a49cb1-524&uimprid=26CBB86E-9A45-48C2-AB1D-E6FB65E63216&mid=OpenRTBIntegration88114&plen=2792&a=${AUCTION_PRICE}&ucrid=5784416259098808038&t=DNPZW09UFpWTVM0ej0maWQ9MCZjaWQ9MjMxNjkmeHByPTEuMDAwMDAwJmZwPTAuMjQ2MDg1JnBwPTAuMjgxMTEmdHA9MCZwZT0wLjAwMDAwMCZwdWJpZD0xNTg2NTEmcGY9MTUmY3A9MC4yNDIwNDQmY2xlbj0xOTY3JmNyPSUzQ2RpdiUyMHN0eWxlJTNEJTIyZGlzcGxheSUzQWlubGluZS1ibG9jayUzQnBvc2l0aW9uJTNBcmVsYXRpdmUlM0Jib3JkZXIlM0Fub25lJTNCbWFyZ2luJTNBMCUzQnBhZGRpbmclM0EwJTIyJTNFJTNDc2NyaXB0JTNFZnVuY3Rpb24lMjBjbGlja0FkJTI4JTI5JTdCdmFyJTIweGh0dHAlMjAlM0QlMjBuZXclMjBYTUxIdHRwUmVxdWVzdCUyOCUyOSUzQnhodHRwLm9wZW4lMjglMjJHRVQlMjIlMkMlMjAlMjJodHRwcyUzQSUyRiUyRnZhYmlkLnByb2Quc2lmdC5jbyUyRmNsaWNrJTNGcmVxJTNEMWM3MTRhMjktNDgyMi00MGVjLThkYzQtMWNiNDRiYWFhYjgzJTI2Y2lkJTNEOTA3NzczOSUyNmNyaWQlM0Q3NzAzNDY5JTI2c3RyJTNEMTI5MzYzMjY1JTI2ZXglM0QyMzElMjZidW4lM0QxNDQzMTkwNTc5JTI2bmFtZSUzRGRyaXZlJTJCYW5kJTJCcGFyayUyNnN1aWQlM0RlMTBhMGUwNS1mOTE3LTQyZmQtODNhYy0wNmE1NTAyMDQ5ZDUlMjZzdWlkdCUzRDElMjZzdWIlMjZhbXQlM0QlN0JQU1BNJTdEJTI2Y3VyJTNEdXNkJTIyJTJDdHJ1ZSUyOSUzQnhodHRwLnNlbmQlMjglMjklM0IlN0QlM0MlMkZzY3JpcHQlM0UlM0NpbWclMjBzcmMlM0QlMjJodHRwcyUzQSUyRiUyRnZhYmlkLnByb2Quc2lmdC5jbyUyRmltcHJlc3Npb24lM0ZyZXElM0QxYzcxNGEyOS00ODIyLTQwZWMtOGRjNC0xY2I0NGJhYWFiODMlMjZlcmVxJTNERTQ2NjExQzktQTdEQS00Qzk2LUFFRDItQ0VFNjYzRDJBOTgxJTI2YXBwJTNENzczMTclMjZjaWQlM0Q5MDc3NzM5JTI2Y3JpZCUzRDc3MDM0NjklMjZzdHIlM0QxMjkzNjMyNjUlMjZjbHMlM0QyMiUyNmV4JTNEMjMxJTI2YW10JTNEJTdCUFNQTSU3RCUyNnN1aWQlM0RlMTBhMGUwNS1mOTE3LTQyZmQtODNhYy0wNmE1NTAyMDQ5ZDUlMjZ0c3QlM0QxJTI2YnVuJTNEMTQ0MzE5MDU3OSUyNm5hbWUlM0Rkcml2ZSUyQmFuZCUyQnBhcmslMjZtayUzRGFwcGxlJTI2bWRsJTNEaXBob25lJTI2b3N2JTNEMTMuMy4xJTI2dHlwJTNEMSUyNnclM0QzMjAlMjZoJTNENTAlMjZkdXIlMjZlYyUzRDAlMjZ1dCUzRDE0NiUyNnV0cyUzRDE3MyUyNnZjJTNEMCUyNm92YyUzREdCX00xJTI2dGVtJTNEOCUyNnIlM0QxJTI2YyUzRFVTQSUyNmclMjZ5b2IlMjZsYW4lM0RlbiUyNnVwYyUzRDE1Nzg3MDQ4MjgyODElMjZhdCUzRDElMjZjZm8lM0QwJTI2c3BsciUyNnBtaWQlMjZmcCUzRDAlMjZ4biUyNnh2JTI2c3VpZHQlM0QxJTI2c3ViJTI2Y3VyJTNEdXNkJTI2c2YlM0QwLjYlMjIlMjB3aWR0aCUzRCUyMjAlMjIlMjBoZWlnaHQlM0QlMjIwJTIyJTIwc3R5bGUlM0QlMjJkaXNwbGF5JTNBbm9uZSUyMiUyRiUzRSUzQ2ElMjB0YXJnZXQlM0QlMjJfYmxhbmslMjIlMjBocmVmJTNEJTIyaXRtcy1hcHBzJTNBJTJGJTJGYXBwcy5hcHBsZS5jb20lMkZhcHAlMkZpZDEwMTcxNDgwNTUlMjIlM0UlM0NpbWclMjBzcmMlM0QlMjJodHRwcyUzQSUyRiUyRnNpZnQtY2FtcGFpZ24tY3JlYXRpdmVzLnNpZnQuY28lMkZjJTJGYXBwJTJGNzczMTclMkZiYjQ1ODQ0Y2I1YzFiZWY4MmU4MTdlNmM2OWMxZDQ3NS5qcGclMjIlMjBib3JkZXIlM0QlMjIwJTIyJTIwb25jbGljayUzRCUyMmNsaWNrQWQlMjglMjklMjIlM0UlM0MlMkZhJTNFJTNDZGl2JTIwc3R5bGUlM0QlMjJwb3NpdGlvbiUzQWFic29sdXRlJTNCbGVmdCUzQTAlM0Jib3R0b20lM0EwJTIyJTNFJTNDYSUyMGhyZWYlM0QlMjJodHRwcyUzQSUyRiUyRmRlbWFuZHNjYWxlLmNvbSUyRmluZGV4Lmh0bWwlM0Z1dG1fc291cmNlJTNEUHViTWF0aWMlMjZ1dG1fbWVkaXVtJTNEMTQ0MzE5MDU3OSUyNnV0bV9jYW1wYWlnbiUzRHdhdGVybWFyayUyMiUyMHN0eWxlJTNEJTIyb3V0bGluZSUzQSUyMG5vbmUlM0IlMjIlM0UlM0NpbWclMjBzcmMlM0QlMjJodHRwcyUzQSUyRiUyRnNpZnQtY2FtcGFpZ24tY3JlYXRpdmVzLnNpZnQuY28lMkZ3YXRlcm1hcmstMS5wbmclMjIlM0UlM0MlMkZhJTNFJTNDJTJGZGl2JTNFJTNDJTJGZGl2JTNF='></script></span> <!-- PubMatic Ad Ends --><iframe width=\"0\" scrolling=\"no\" height=\"0\" frameborder=\"0\" src=\"https://lyr.pubmatic.com/AdServer/layer?pubid=158651&nwid=158651&ts=1582158644&cid=23169&pimprid=538-97c78bdf5a49cb1-524&uimprid=26CBB86E-9A45-48C2-AB1D-E6FB65E63216&mid=OpenRTBIntegration88114&plen=1496&a=${AUCTION_PRICE}&ucrid=5784416259098808038&t=MTOZW09UlRZTVM0ej0maWQ9MCZjaWQ9MjMxNjkmeHByPTEuMDAwMDAwJmZwPTAuMjQ2MDg1JnBwPTAuMjgxMTEmdHA9MSZwZT0wLjAwMDAwMCZwdWJpZD0xNTg2NTEmcGY9MTUmY3A9MC4yNDIwNDQmY2xlbj05OTQmY3I9aHR0cHMlM0ElMkYlMkZha3RyYWNrLnB1Ym1hdGljLmNvbSUyRkFkU2VydmVyJTJGQWREaXNwbGF5VHJhY2tlclNlcnZsZXQlM0ZvcGVySWQlM0QxJTI2cHViSWQlM0QxNTg2NTElMjZzaXRlSWQlM0Q2NDkyNTMlMjZhZElkJTNEMjU2MTc2NSUyNmFkVHlwZSUzRDEwJTI2YWRTZXJ2ZXJJZCUzRDI0MyUyNmtlZmFjdCUzRCU3QlBTUE0lN0QlMjZrYXhlZmFjdCUzRCU3QlBTUE0lN0QlMjZrYWROZXRGcmVxdWVjeSUzRDAlMjZrYWR3aWR0aCUzRDMyMCUyNmthZGhlaWdodCUzRDUwJTI2a2Fkc2l6ZWlkJTNEMzElMjZrbHRzdGFtcCUzRDE1ODIxNTg2NDQlMjZpbmRpcmVjdEFkSWQlM0QwJTI2YWRTZXJ2ZXJPcHRpbWl6ZXJJZCUzRDIlMjZyYW5yZXElM0QwLjElMjZrcGJtdHBmYWN0JTNEJTdCUFNQTSU3RCUyNnRsZElkJTNENjA1NTMzNjAlMjZwYXNzYmFjayUzRDAlMjZla2VmYWN0JTNEJTdCUFNQTSU3RCUyNmVrYXhlZmFjdCUzRCU3QlBTUE0lN0QlMjZla3BibXRwZmFjdCUzRCU3QlBTUE0lN0QlMjZzdnIlM0RCSUQ4ODY2NVUlMjZjcklEJTNENzcwMzQ2OSUyNmxwdSUzRHN0YXNoaW52ZXN0LmNvbSUyNnVjcmlkJTNENTc4NDQxNjI1OTA5ODgwODAzOCUyNmNhbXBhaWduSWQlM0QyMzE2OSUyNmNyZWF0aXZlSWQlM0QwJTI2cGN0ciUzRDAuMDAwMDAwJTI2d0RTUEJ5cklkJTNEMjMwJTI2d0RzcElkJTNEMTIwMCUyNndiSWQlM0QxNCUyNndySWQlM0QwJTI2d0FkdklEJTNENTM2NjQ0JTI2aXNSVEIlM0QxJTI2cnRiSWQlM0RFNDY2MTFDOS1BN0RBLTRDOTYtQUVEMi1DRUU2NjNEMkE5ODElMjZpbXBySWQlM0QyNkNCQjg2RS05QTQ1LTQ4QzItQUIxRC1FNkZCNjVFNjMyMTYlMjZvaWQlM0QyNkNCQjg2RS05QTQ1LTQ4QzItQUIxRC1FNkZCNjVFNjMyMTYlMjZtb2JmbGFnJTNEMSUyNmlzbW9iaWxlYXBwJTNEMSUyNm1vZGVsaWQlM0Q5NyUyNm9zaWQlM0QyMTclMjZ1ZGlkdHlwZSUzRDElMjZjb3VudHJ5JTNEVVMlMjZjbnRyeUlkJTNEMjMyJTI2c2VjJTNEMQ===\" style=\"position:absolute;top:-15000px;left:-15000px\" vspace=\"0\" hspace=\"0\" marginwidth=\"0\" marginheight=\"0\" allowtransparency=\"true\" name=\"pbeacon\"></iframe>";
  if(isVideo && !isWrapper) adm = "<VAST version=\"4.1\" xmlns:xs=\"https://www.w3.org/2001/XMLSchema\"><Ad id=\"20001\"><InLine><AdSystem version=\"4.0\">iabtechlab</AdSystem><AdTitle>iabtechlab video ad 300x250 test </AdTitle><Pricing model=\"cpm\" currency=\"USD\"><![CDATA[ 25.00 ]]></Pricing><Error>https://example.com/error</Error><AdVerifications><Verification vendor=\"iabtechlab.com-omid\"><JavaScriptResource apiFramework=\"omid\" browserOptional=\"true\"><![CDATA[https://ads.pubmatic.com/openbidsdk/omid-validation-verification-js-script/omid-validation-verification-script-v1.js]]></JavaScriptResource><TrackingEvents><Tracking event=\"verificationNotExecuted\"><![CDATA[]]></Tracking></TrackingEvents><VerificationParameters><![CDATA[iabtechlab-pubmatic]]></VerificationParameters></Verification></AdVerifications><Impression id=\"Impression-ID\">https://aktrack.pubmatic.com/track?param=impression</Impression><Creatives><Creative id=\"5480\" sequence=\"1\"><Linear skipoffset=\"00:00:05\"><Duration>00:00:15</Duration><TrackingEvents><Tracking event=\"start\">https://aktrack.pubmatic.com/track?param=start</Tracking><Tracking event=\"firstQuartile\">https://aktrack.pubmatic.com/track?param=firstQuartile</Tracking><Tracking event=\"midpoint\">https://aktrack.pubmatic.com/track?param=midpoint</Tracking><Tracking event=\"thirdQuartile\">https://aktrack.pubmatic.com/track?param=thirdQuartile</Tracking><Tracking event=\"complete\">https://aktrack.pubmatic.com/track?param=complete</Tracking><Tracking event=\"progress\" offset=\"00:00:10\">https://aktrack.pubmatic.com/track?param=progress-10</Tracking><Tracking event=\"mute\">https://aktrack.pubmatic.com/track?param=mute</Tracking><Tracking event=\"unmute\">https://aktrack.pubmatic.com/track?param=unmute</Tracking><Tracking event=\"closeLinear\">https://aktrack.pubmatic.com/track?param=closeLinear</Tracking><Tracking event=\"skip\">https://aktrack.pubmatic.com/track?param=skip</Tracking></TrackingEvents><VideoClicks><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_01]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_02]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_03]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_04]]></ClickTracking><ClickThrough id=\"blog\"><![CDATA[https://pubmatic.com]]></ClickThrough><CustomClick>https://pubmatic.com</CustomClick></VideoClicks><MediaFiles><MediaFile id=\"5241\" delivery=\"progressive\" type=\"video/mp4\" bitrate=\"500\" width=\"1440\" height=\"780\" minBitrate=\"360\" maxBitrate=\"1080\" scalable=\"1\" maintainAspectRatio=\"1\" codec=\"0\"><![CDATA[https://ads.pubmatic.com/openbidsdk/creative/video/1280x720.mp4]]></MediaFile></MediaFiles></Linear></Creative></Creatives><Extensions><Extension type=\"iab-Count\"><total_available><![CDATA[ 2 ]]></total_available></Extension></Extensions></InLine></Ad></VAST>";
  if(isVideo && isWrapper) adm = "<VAST version=\"4.1\" xmlns:xs=\"https://www.w3.org/2001/XMLSchema\"><Ad id=\"20001\"><Wrapper><AdSystem version=\"4.0\">iabtechlab</AdSystem><AdTitle>iabtechlab video ad 300x250 test </AdTitle><Pricing model=\"cpm\" currency=\"USD\"><![CDATA[ 25.00 ]]></Pricing><Error>https://example.com/error</Error><AdVerifications><Verification vendor=\"iabtechlab.com-omid\"><JavaScriptResource apiFramework=\"omid\" browserOptional=\"true\"><![CDATA[https://ads.pubmatic.com/openbidsdk/omid-validation-verification-js-script/omid-validation-verification-script-v1.js]]></JavaScriptResource><TrackingEvents><Tracking event=\"verificationNotExecuted\"><![CDATA[]]></Tracking></TrackingEvents><VerificationParameters><![CDATA[iabtechlab-pubmatic]]></VerificationParameters></Verification></AdVerifications><Impression id=\"Impression-ID\">https://aktrack.pubmatic.com/track?param=impression</Impression><Creatives><Creative id=\"5480\" sequence=\"1\"><Linear skipoffset=\"00:00:05\"><Duration>00:00:15</Duration><TrackingEvents><Tracking event=\"start\">https://aktrack.pubmatic.com/track?param=start</Tracking><Tracking event=\"firstQuartile\">https://aktrack.pubmatic.com/track?param=firstQuartile</Tracking><Tracking event=\"midpoint\">https://aktrack.pubmatic.com/track?param=midpoint</Tracking><Tracking event=\"thirdQuartile\">https://aktrack.pubmatic.com/track?param=thirdQuartile</Tracking><Tracking event=\"complete\">https://aktrack.pubmatic.com/track?param=complete</Tracking><Tracking event=\"progress\" offset=\"00:00:10\">https://aktrack.pubmatic.com/track?param=progress-10</Tracking><Tracking event=\"mute\">https://aktrack.pubmatic.com/track?param=mute</Tracking><Tracking event=\"unmute\">https://aktrack.pubmatic.com/track?param=unmute</Tracking><Tracking event=\"closeLinear\">https://aktrack.pubmatic.com/track?param=closeLinear</Tracking><Tracking event=\"skip\">https://aktrack.pubmatic.com/track?param=skip</Tracking></TrackingEvents><VideoClicks><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_01]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_02]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_03]]></ClickTracking><ClickTracking id=\"blog\"><![CDATA[https://aktrack.pubmatic.com/track?param=clickTracking_04]]></ClickTracking><ClickThrough id=\"blog\"><![CDATA[https://pubmatic.com]]></ClickThrough><CustomClick>https://pubmatic.com</CustomClick></VideoClicks><MediaFiles><MediaFile id=\"5241\" delivery=\"progressive\" type=\"video/mp4\" bitrate=\"500\" width=\"1440\" height=\"780\" minBitrate=\"360\" maxBitrate=\"1080\" scalable=\"1\" maintainAspectRatio=\"1\" codec=\"0\"><![CDATA[https://ads.pubmatic.com/openbidsdk/creative/video/1280x720.mp4]]></MediaFile></MediaFiles></Linear></Creative></Creatives><Extensions><Extension type=\"iab-Count\"><total_available><![CDATA[ 2 ]]></total_available></Extension></Extensions></Wrapper></Ad></VAST>";

  return {
    "id": reqId,
    "seatbid": [{
      "bid": [{
        "id": uuidv4(),
        "impid": "575",
        "price": bidPrice,
        "adm": adm,
        "adomain": ["stashinvest.com"],
        "iurl": "https://sift-campaign-creatives.sift.co/c/app/77317/bb45844cb5c1bef82e817e6c69c1d475.jpg",
        "nurl": "http://localhost:3001/winNotice",
        "cid": "23169",
        "crid": "7703469",
        "h": 250,
        "w": 300,
        "ext": {
          "dspid": 1200,
          "advid": 536644
        }
      }
      ],
      "seat": seatName
    }],
    "cur": "USD",
    "nbr": "nbr"
  };
}

function Controller() { }

module.exports = Controller;


Controller.verifyWin = async function (req, res) {
  console.log("Win");
  return await res.sendStatus(200);
}

const baseDelay = 1;

function getRequestParams(req){
  let delay = !req.query.delay ? baseDelay : req.query.delay;
  let isVideo = false; if(req?.body?.imp?.[0]?.video) isVideo = true;
  let isWrapper = req.query.wrapper == 1 ? true : false;

  return { delay, isVideo, isWrapper };
}

/**
 * Handler for endpoint POST: /dsp
 *
 * @param {Request} req
 * @param {Response} res
 */
Controller.handleDspWithSpecificBidPrice = async (req, res) => {
  let { delay, isVideo, isWrapper } = getRequestParams(req);

  try {

    setTimeout(function() {
      return res.json(
        GenerateBidResponse(
          req.body.id, 
          req.params.offerPrice, 
          req.query.seatName,
          isVideo,
          isWrapper
        )
      );

    }, delay);
  } catch (error) {
    console.log(error);
  }

  // let temp = GenerateBidResponse(
  //   req.body.id, 
  //   req.params.offerPrice, 
  //   req.query.seatName
  // );
  // return await res.json(
  //   temp
  // );

};

Controller.handleDspWithRandomBidPrice = async (req, res) => {
  let { delay, isVideo, isWrapper } = getRequestParams(req);

  try {

    setTimeout(function() {
      let bidFloor = req.body.imp[0].bidfloor, max = bidFloor + 0.5, min = bidFloor - 0.5;
      let bidPrice = Math.random() * (max - min) + min;

      return res.json(
        GenerateBidResponse(
          req.body.id, 
          bidPrice, 
          req.query.seatName,
          isVideo,
          isWrapper
        )
      );

    }, delay);
  } catch (error) {
    console.log(error);
  }

  // let bidFloor = req.body.imp[0].bidfloor, max = bidFloor + 0.5, min = bidFloor - 0.5;
  //     let bidPrice = Math.random() * (max - min) + min;

  //     return await res.json(
  //       GenerateBidResponse(
  //         req.body.id, 
  //         bidPrice, 
  //         req.query.seatName
  //       )
  //     );

};

Controller.handleDspWithLowerBidPrice = async (req, res) => {
  let { delay, isVideo, isWrapper } = getRequestParams(req);

  try {

    setTimeout(function() {
      let bidFloor = req.body.imp[0].bidfloor;
      let bidPrice = bidFloor * 0.9;
      // console.log(`Price: ${bidPrice} - Bid Floor: ${bidFloor}`);
  
      return res.json(
        GenerateBidResponse(
          req.body.id, 
          bidPrice, 
          req.query.seatName,
          isVideo,
          isWrapper
        )
      );

    }, delay);
  } catch (error) {
    console.log(error);
  }

  // let bidFloor = req.body.imp[0].bidfloor;
  //     let bidPrice = bidFloor * 0.9;
  
  //     return await res.json(
  //       GenerateBidResponse(
  //         req.body.id, 
  //         bidPrice, 
  //         req.query.seatName
  //       )
  //     );

};

Controller.handleDspWithHigherBidPrice = async (req, res) => {
  let { delay, isVideo, isWrapper } = getRequestParams(req);

  try {

    setTimeout(function() {
      let bidFloor = req.body.imp[0].bidfloor;
      let bidPrice = bidFloor * 1.1;
  
      return res.json(
        GenerateBidResponse(
          req.body.id, 
          bidPrice, 
          req.query.seatName,
          isVideo,
          isWrapper
        )
      );

    }, delay);
  } catch (error) {
    console.log(error);
  }

  // let bidFloor = req.body.imp[0].bidfloor;
  //     let bidPrice = bidFloor * 1.1;
  
  //     return await res.json(
  //       GenerateBidResponse(
  //         req.body.id, 
  //         bidPrice, 
  //         req.query.seatName
  //       )
  //     );
};


Controller.handleDspWithWrongBidResponse = async (req, res) => {
  let { delay, isVideo, isWrapper } = getRequestParams(req);

  try {

    setTimeout(function() {
      return res.json(
        {
          "wrong": true
        }
      );

    }, delay);
  } catch (error) {
    console.log(error);
  }

  // return await res.json(
  //   {
  //     "wrong": true
  //   }
  // );

};


