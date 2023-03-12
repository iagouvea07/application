const HTML_TEMPLATE = (text) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cloud Stream Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 5px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>Account Activation</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
              <div class="email-footer">
                <p>Cloud Stream  &copy; Copyright</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  module.exports = HTML_TEMPLATE