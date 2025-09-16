export default function getOff({ price = 10000, off = 50 }) {        
  return (off * price) / 100;
}

