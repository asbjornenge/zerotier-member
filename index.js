var fs = require('fs')
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
var identity = ""
var identityError;
function readIdentity() {
  try {
    var raw = fs.readFileSync(args['zerotier-home']+'/identity.public').toString()
    return raw.split(':')[0] 
  } catch(e) { identityError = e}
}

// API functions
var apiResponse;
var apiError;
function callApi() {
// curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header 'Authorization: Bearer utdJFjJcNnbKPHHAkrwsAqzU3y74bCjZ' https://my.zerotier.com/api/network/$1/member/$ZERO_ADDRESS -d '{"name":"'$(hostname)'","config":{"authorized":true}}'
}
