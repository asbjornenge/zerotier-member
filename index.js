var fs = require('fs')
var https = require('https')
var args = require('minimist')(process.argv.slice(2), {
  default: {
    retry:              process.env['ZA_RETRY']         || 0,
    interval:           process.env['ZA_INTERVAL']      || 5000,
    keepalive:          process.env['ZA_KEEPALIVE']     || false,
    'zerotier-home':    process.env['ZA_ZEROTIER_HOME'] || '/var/lib/zerotier-one',
    network:            process.env['ZA_NETWORK'],
    'zerotier-api-key': process.env['ZA_ZEROTIER_API_KEY']
  }
})

if (!args.network)
  { console.error('Missing required `network` parameter'); process.exit(1) }
if (!args['zerotier-api-key'])
  { console.error('Missing required `zerotier-api-key` parameter'), process.exit(1) }

try { args.network = JSON.parse(args.network) } catch(e) {}
if (typeof args.network !== 'object')
  args.network = [args.network]

console.log(args)

// Identity functions 
function readIdentity(callback) {
  try {
    fs.readFile(args['zerotier-home']+'/identity.public', function(err, data) {
      if (err) return callback(err)
      callback(null, data.toString().split(':')[0]) 
    })
  } catch(e) { callback(e) }
}

// API functions
var apiResponse;
var apiError;
function callApi(identity, network, key, callback) {
  var options = {
    hostname: 'my.zerotier.com',
    port: 443,
    path: '/api/network/'+network+'/member/'+identity,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+key
    }
  }
  var postData = JSON.stringify({
    config: {
      authorized: true
    }
  })

  console.log(options)
  var req = http.request(options, function(res) {
    console.log('STATUS:'+ res.statusCode)
    console.log('HEADERS:'+ JSON.stringify(res.headers))
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      console.log('BODY: '+chunk)
    })
    res.on('end', () => {
      console.log('No more data in response.')
    })
  })

  req.on('error', callback)
  req.write(postData)
  req.end()
}

function loop() {
  setTimeout(function() {
    readIdentity(function(err, identity) {
      if (err) { console.error(err); return loop() }
      callApi(identity, args.network, args['zerotier-api-key'], function() {
        
      })
    })
  }, args.interval)
}
loop()
