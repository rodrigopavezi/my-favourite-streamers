# My Favourite Streamer

This is an app to show streams and events from your favourite twitch streamers. [DEMO HERE](https://my-favourite-streamers.firebaseapp.com/)

![alt text](https://github.com/rodrigopavezi/my-favourite-streamers/blob/master/preview.png "preview")

- [Architecture](https://github.com/rodrigopavezi/my-favourite-streamers/tree/master/design/architecture)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node
```

## Depencendies

- [Firebase Cloud Functions](https://github.com/rodrigopavezi/my-favourite-streamers-functions)

## Development

### Build

```
yarn
```

### Run

```
yarn start
```

## Built With

```
JavaScript
TypeScript
React
Node
yarn
```

### How would you deploy the above on AWS? (ideally a rough architecture diagram will help)

- [Architecture](https://github.com/rodrigopavezi/my-favourite-streamers/tree/master/design/architecture)

### Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?

I have used firebase mostly because it is an infrastucture that is free, for starting and making MVPs, but can scale really well and will take care of the 100 reqs/day to 900MM reqs/day requirement.

## Authors

- **Rodrigo Serviuc Pavezi** - [rodrigopavezi](https://github.com/rodrigopavezi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
