import Footer from "@/components/Footer";
import { LandingNavbar } from "@/components/landing-navbar";

const MarketPlace = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#111827]">
      <main className="h-full bg-[#111827] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">
          <LandingNavbar />
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default MarketPlace;
