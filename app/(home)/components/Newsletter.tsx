import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <div className="w-full pb-24 px-14 text-white">
      <div className="flex justify-between items-center p-16 bg-secondary rounded-xl">
        <div>
          <h1 className="font-montserrat font-semibold text-xl">
            Join the movement
          </h1>
          <p className="font-hanken text-gray-200 text-xs">
            Get updates on new collections and secret drops.
          </p>
        </div>
        <div>
          <form>
            <div className="relative bg-[#ffffff10] rounded-xl">
              <Input
                placeholder="Enter your email"
                className="w-125 h-16 pr-25 font-hanken text-xs placeholder:text-gray-200 border-0 outline-0 focus:outline-0"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-14 px-6 py-4 font-hanken font-semibold text-xs ">
                JOIN
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
