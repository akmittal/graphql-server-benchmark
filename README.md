# graphql-server-benchmark

## Frameworks: 
**Node**: apollo-server, node 12

**Go**: gqlgen, go 1.13


## Node.js

### Todo Create
- 15139 requests in 9.988513443s, 4.29MB read
- Requests/sec:		1515.64
- Transfer/sec:		439.60KB
- Avg Req Time:		6.597868ms
- Fastest Request:	1.430127ms
- Slowest Request:	217.975244ms
- Number of Errors:	0

### Get All Todos
- 243 requests in 10.19804856s, 161.44MB read
- Requests/sec:		23.83
- Transfer/sec:		15.83MB
- Avg Req Time:		419.67278ms
- Fastest Request:	196.054302ms
- Slowest Request:	987.44692ms
- Number of Errors:	0

## Go

### Todo Create
- 245713 requests in 9.805829725s, 404.22MB read
- Requests/sec:		25057.85
- Transfer/sec:		41.22MB
- Avg Req Time:		399.076µs
- Fastest Request:	89.915µs
- Slowest Request:	42.857232ms


### Get All Todos
- 245713 requests in 9.805829725s, 404.22MB read
- Requests/sec:		25057.85
- Transfer/sec:		41.22MB
- Avg Req Time:		399.076µs
- Fastest Request:	89.915µs
- Slowest Request:	42.857232ms


## Requests per second
|        | Go       | Node    |
|--------|----------|---------|
| Create | 25057.85 | 1515.64 |
| Fetch  | 24393.71 | 23.83   |


