import jwt from 'jsonwebtoken';
import keyconfig from '../../db/keyconfig';

const tokendecode = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, keyconfig, function(err, decoded) {
        if (err) return resp.status(500).send({ auth: false, message: 'Unauthorized token' });
        req.userId = decoded.id;

        next();
    })
}

export default tokendecode;