import CityGrid from "@/components/CityGrid";
import Clock from "@/components/Clock";
import DayModal from "@/components/modals/DayModal";
import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center py-10">

      {/* Header */}
      <div className="flex flex-col flex-1 gap-4 m-10 items-center h-fit">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">Weather</h1>
          <Clock/>
        </div>
        <Search/>
      </div>

      {/* Data */}
      <div className="w-full h-full px-2 sm:px-4 md:px-8 mb-10">
        <CityGrid/>
      </div>

      {/* Modal */}
      <DayModal/>

    </div>
  );
}
