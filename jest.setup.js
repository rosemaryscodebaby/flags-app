import '@testing-library/jest-dom/extend-expect';


// Mock TextEncoder and TextDecoder for Jest testing environment
import { TextEncoder, TextDecoder } from 'util';

if (global.TextEncoder === undefined) {
    global.TextEncoder = TextEncoder;
}

if (global.TextDecoder === undefined) {
    global.TextDecoder = TextDecoder;
}