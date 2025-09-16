
import './styles/lightButton.css'
export default function LightButton({ children, onClick, className }) {
  return <button className={`flex items-center gap-x-2 font-dana-md lightButton dark:text-light ${className}`} onClick={onClick}>{children}</button>;
}
