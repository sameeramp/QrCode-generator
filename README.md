# QR Code Generator API

This is a simple Express.js application that generates and serves QR codes based on provided URLs and parameters. It includes health checks and validates URLs against a list of allowed domains.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and set your environment variables:
    ```plaintext
    PORT=3000
    ALLOWED_DOMAINS=dottt.me,ai.dottt.me,dotttme.com
    ```

4. Start the application:
    ```bash
    npm start
    ```

## Usage

After starting the application, it will be running on the port specified in your `.env` file or default to port 3000. You can access the health check endpoint and the QR code generation endpoint as described below.

## API Endpoints

### Health Check

- **Endpoint:** `/health`
- **Method:** GET
- **Description:** Returns a status message to indicate the server is running.

#### Response
- **Status Code:** 200 OK
- **Body:**
    ```plaintext
    health page
    ```

### Generate QR Code

- **Endpoint:** `/qrcode/download`
- **Method:** GET
- **Description:** Generates a QR code based on the provided query parameters and returns the image.

#### Query Parameters
- `chs` (required): Size of the QR code in the format `WIDTHxHEIGHT` (e.g., `200x200`).
- `cht` (required): Type of chart, should be `qr`.
- `chl` (required): URL-encoded data for the QR code.
- `fileType` (optional): File type of the QR code image (`png` or `svg`). Defaults to `png`.

#### Response
- **Status Code:** 200 OK
- **Headers:**
    - `Content-Type`: `image/png` or `image/svg+xml`
    - `Content-Disposition`: `attachment; filename="qr-code.png"` (or `.svg`)
- **Body:** Binary image data.

#### Example Request
```bash
curl "http://localhost:3000/qrcode/download?chs=200x200&cht=qr&chl=https%3A%2F%2Fexample.com&fileType=png"
