subscription_key = "354f9ac5f2f04a008504575c15f458a7"
assert subscription_key

face_api_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'

image_url = 'https://how-old.net/Images/faces2/main007.jpg'
image2 = 'https://avatars0.githubusercontent.com/u/4970711?s=460&v=4'

import requests
import json

headers = { 'Ocp-Apim-Subscription-Key': subscription_key }

params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,emotion',
}

response = requests.post(face_api_url, params=params, headers=headers, json={"url": image_url})
faces = response.json()

f = open("faces.json", "w")
json.dump(faces, f)
f.close
