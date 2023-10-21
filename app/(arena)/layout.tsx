import Footer from "@/components/Footer";
import { LandingNavbar } from "@/components/landing-navbar";

const Arena = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-nft-dark overflow-auto">
      <LandingNavbar />
      <div className="mx-auto bg-nft-dark max-w-screen-xl h-full w-full">
        {children}
      </div>
    </main>
  );
};

export default Arena;
