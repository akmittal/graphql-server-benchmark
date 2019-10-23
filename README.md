# graphql-server-benchmark

## Frameworks: 
**Node**: apollo-server, node 12

**Go**: gqlgen, go 1.13


## Node.js

### Todo Create
- 13511 requests in 8.746846244s, 3.83MB read
- Requests/sec:		1544.67
- Transfer/sec:		448.01KB
- Avg Req Time:		6.47387ms
- Fastest Request:	1.436788ms
- Slowest Request:	120.766305ms
- Number of Errors:	10

### Get All Todos
- 5224 requests in 9.999321349s, 115.85MB read
- Requests/sec:		522.44
- Transfer/sec:		11.59MB
- Avg Req Time:		19.14112ms
- Fastest Request:	5.511761ms
- Slowest Request:	186.031624ms
- Number of Errors:	0


## Go

### Todo Create
- 235243 requests in 9.821609411s, 387.00MB read
- Requests/sec:		23951.57
- Transfer/sec:		39.40MB
- Avg Req Time:		417.509µs
- Fastest Request:	85.151µs
- Slowest Request:	103.675832ms
- Number of Errors:	0


### Get All Todos
- 258638 requests in 9.786205776s, 425.48MB read
- Requests/sec:		26428.83
- Transfer/sec:		43.48MB
- Avg Req Time:		378.374µs
- Fastest Request:	89.594µs
- Slowest Request:	41.66178ms
- Number of Errors:	0


## Requests per second
|        | Go       | Node    |
|--------|----------|---------|
| Create | 23951.57 | 1544.67 |
| Fetch  | 26428.83 | 522.44  |


