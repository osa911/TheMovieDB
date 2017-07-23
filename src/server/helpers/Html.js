import React, { Component } from 'react';

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

export default class Html extends Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Hello</title>
          <link rel="stylesheet" type="text/css" href={`${assetUrl}/public/assets/styles.css`} />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        </head>
        <body>
          <div id="react-view"></div>
          <script type="application/javascript" src={`${assetUrl}/public/assets/bundle.js`}></script>
        </body>
      </html>
    );
  }
}