#  WordConverter V0.1.0

This App converts Word Documents to HTML files.

### Clone this repo

`git clone https://github.com/vireshsoedhwa/WordConverter.git`

### Demo

http://102.129.249.112:8000

### How to run

`cd WordConverter`

`docker-compose up`    

### Usage

Once the app is finished starting up go to:
http://localhost:8000

### Improvements for V1.0.0

- make app production ready
- implement function to make image paths relative to bypass pandocs asset extraction
- ability to upload documents in batch instead of one by one
- provide "alt" text for images manually by user input

### Assumptions

- Users will only upload word files that contain no malicious code
- Only one user will be using the site simultaneously
- word documents contain non-sensitive data and are visible to any visitors to the site
