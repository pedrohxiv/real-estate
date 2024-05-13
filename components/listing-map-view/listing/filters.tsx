import { Bath, BedDoubleIcon, CarFront } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  setBedCount: (value: string) => void;
  setBathCount: (value: string) => void;
  setParkingCount: (value: string) => void;
  setHomeType: (value: string) => void;
}

export const Filters = ({
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType,
}: FiltersProps) => {
  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 w-full">
      <Select onValueChange={setBedCount}>
        <SelectTrigger>
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <BedDoubleIcon className="h-4 w-4 text-primary" />
              2+
            </div>
          </SelectItem>
          <SelectItem value="3" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <BedDoubleIcon className="h-4 w-4 text-primary" />
              3+
            </div>
          </SelectItem>
          <SelectItem value="4" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <BedDoubleIcon className="h-4 w-4 text-primary" />
              4+
            </div>
          </SelectItem>
          <SelectItem value="5" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <BedDoubleIcon className="h-4 w-4 text-primary" />
              5+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setBathCount}>
        <SelectTrigger>
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <Bath className="h-4 w-4 text-primary" />
              2+
            </div>
          </SelectItem>
          <SelectItem value="3" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <Bath className="h-4 w-4 text-primary" />
              3+
            </div>
          </SelectItem>
          <SelectItem value="4" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <Bath className="h-4 w-4 text-primary" />
              4+
            </div>
          </SelectItem>
          <SelectItem value="5" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <Bath className="h-4 w-4 text-primary" />
              5+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setParkingCount}>
        <SelectTrigger>
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <CarFront className="h-4 w-4 text-primary" />
              1+
            </div>
          </SelectItem>
          <SelectItem value="2" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <CarFront className="h-4 w-4 text-primary" />
              2+
            </div>
          </SelectItem>
          <SelectItem value="3" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <CarFront className="h-4 w-4 text-primary" />
              3+
            </div>
          </SelectItem>
          <SelectItem value="4" className="cursor-pointer">
            <div className="flex gap-2 items-center">
              <CarFront className="h-4 w-4 text-primary" />
              4+
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          value === "All" ? setHomeType("") : setHomeType(value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All" className="cursor-pointer">
            All
          </SelectItem>
          <SelectItem value="Single Family House" className="cursor-pointer">
            Single Family House
          </SelectItem>
          <SelectItem value="Town House" className="cursor-pointer">
            Town House
          </SelectItem>
          <SelectItem value="Condo" className="cursor-pointer">
            Condo
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
