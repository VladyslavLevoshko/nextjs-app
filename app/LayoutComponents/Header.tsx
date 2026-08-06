import Logo from "./Logo";
import Navigation from "./Navigation";
import { Container } from "../SharedComponents/PageLayouts";

export default function Header(){
    return (
          <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <Container>
              <div className="flex items-center justify-between h-16">
                <Logo/>
                <Navigation/>
              </div>
            </Container>
          </header>
    )
}