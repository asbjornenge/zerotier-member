# ZeroTier Authorize (Work In Progress)

A small service to authorize a node on a [ZeroTier](https://www.zerotier.com/) network.

It is meant to be used in conjuction with the [zerotier service](https://hub.docker.com/r/zerotier/zerotier-containerized/).   
I use it to authorize [linuxkit](https://github.com/linuxkit/linuxkit) nodes onto ZT networks :zap::tada:.

## Use

```
docker run -d asbjornenge/zerotier-authorize:latest --network 8056c2e21c000001 --zerotier-api-key=<key>
```

The following will pull the latest `asbjornenge/zerotier-authorize` image from the [docker hub]() and run it.
The service will wait for zerotier to generate an `identity`, then attempt to authorize it on all passed networks.
When connected to all networks, the service will exit (unless `keepalive` is passed). 

## Options

```
network           - Network `id` to connect to (required, can pass multiple)
zerotier-api-key  - ZeroTier API key (required)
retry             - Number of retries before giving up - passing 0 will retry forever (default: 0)
interval          - Interval between retries (default: 5000)
keepalive         - Keep service running (default: false)
zerotier-home     - ZeroTier config folder (default: /var/lib/zerotier-one)
```

Options can be passe either as parameters or as ENV variable (with a ZR\_ prefix; `ZR_ZEROTIER_HOME`).

enjoy. 
