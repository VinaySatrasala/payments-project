import { Center } from "./Center";

export default function P2P({ icon, type, id, amount, date }: any): JSX.Element {
  const isReceived = type === "Received";

  return (
    <div>
      <div className="flex py-2 items-center">
        {/* Icon */}
        <div className="bg-black rounded-full w-14 h-14 flex items-center justify-center">
          {icon}
        </div>

        {/* Transaction Details */}
        <div className="ml-4 flex-grow">
          <h1 className="text-lg font-semibold">{type}</h1>
          <h2 className="text-sm text-gray-500">{id}</h2>
        </div>

        {/* Amount */}
        <div className={`text-lg font-bold ${isReceived ? "text-green-500" : "text-red-500"}`}>
          {amount}
        </div>
      </div>

      {/* Date */}
      <div className="text-gray-400 text-sm mt-1">{date}</div>
    </div>
  );
}
