module.exports = ({
  code: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONLFICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    SERVICE_UNAVAILABLE: 503
  },
  message: {
    OK: 'Success',
    CREATED: 'Created',
    ACCEPTED: 'Accepted',
    NO_CONTENT: 'No Content',

    BAD_REQUEST: 'Bad Request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    METHOD_NOT_ALLOWED: 'Method Not Allowed',
    NOT_ACCEPTABLE: 'Not Acceptable',
    REQUEST_TIMEOUT: 'Request Timeout',
    CONLFICT: 'Conflict',
    UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
    TOO_MANY_REQUESTS: 'Too Many Requests',

    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_IMPLEMENTED: 'Not Implemented',
    SERVICE_UNAVAILABLE: 'Service Unavailable'
  },
  type: {
    OK: 'success',
    CREATED: 'created',
    ACCEPTED: 'accepted',
    NO_CONTENT: 'no_content',

    BAD_REQUEST: 'bad_request',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    NOT_FOUND: 'not_found',
    METHOD_NOT_ALLOWED: 'method_not_allowed',
    NOT_ACCEPTABLE: 'not_acceptable',
    REQUEST_TIMEOUT: 'request_timeout',
    CONLFICT: 'conflict',
    UNPROCESSABLE_ENTITY: 'unprocessable_entity',
    TOO_MANY_REQUESTS: 'too_many_requests',

    INTERNAL_SERVER_ERROR: 'internal_server_error',
    NOT_IMPLEMENTED: 'not_implemented',
    SERVICE_UNAVAILABLE: 'service_unavailable'
  }
})
