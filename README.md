#### Prepare the Source Codes

<pre>
git clone https://github.com/ndb7967/community
</pre>

#### Prepare the Configuration File

* Prepare the <code>backend/config.json</code> file.
<pre>
{
    "db_string": {MongoDB Database String},
    "jwt_key": {JWT Secret Key}
}
</pre>

#### Install and Start the Server Application

<pre>
cd backend
yarn install
nodemon index.js
</pre>

#### Install and Start the Client Application

<pre>
cd frontend
yarn install
yarn start
</pre>

#### Usage

* Connect the website <code>http://localhost:3000/</code>.
