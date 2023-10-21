import Footer from "@/components/Footer";
import { LandingNavbar } from "@/components/landing-navbar";

const Market = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-nft-dark overflow-auto">
      <div className="mx-auto bg-nft-dark max-w-screen-xl h-full w-full">
        <LandingNavbar />
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default Market;
