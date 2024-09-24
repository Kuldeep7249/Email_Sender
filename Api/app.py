from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS
CORS(app)


# Configuring Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'kuldeep304057@gmail.com'
app.config['MAIL_PASSWORD'] = 'tsuj gxjh cxoh yxmg'
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

mail = Mail(app)

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    recipient = data.get('email')
    subject = data.get('subject')
    message_body = data.get('message')

    if recipient and subject and message_body:
        msg = Message(subject, recipients=[recipient])
        msg.body = message_body
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"}), 200
    else:
        return jsonify({"error": "Missing fields"}), 400

if __name__ == '__main__':
    app.run(debug=True)
