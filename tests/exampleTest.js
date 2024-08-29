import { check } from 'k6';
import { getRequest, postRequest } from '../lib/httpUtils';
import { generateUserData } from '../lib/dataGenerator';
import config from '../config/environment';

export const options = {
    stages: [
        { duration: '30s', target: USERS / 2 },  // Ramp up to half the users
        { duration: DURATION, target: USERS },   // Stay at the configured number of users
        { duration: '30s', target: 0 },          // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% of requests must complete below 500ms
    },
};

export default function () {
    let userData = generateUserData();
    let loginRes = postRequest(`${config.baseURL}/login`, JSON.stringify(userData), {
        'Content-Type': 'application/json',
    });

  // Perform checks and validations
  check(loginRes, {
    'login was successful': (r) => r.status === 200,
    'response time is less than 500ms': (r) => r.timings.duration < 500,
    'response contains success message': (r) => JSON.parse(r.body).success === true,
});
sleep(1);
}
