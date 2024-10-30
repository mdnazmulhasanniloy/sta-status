/* eslint-disable  @typescript-eslint/no-explicit-any */
/* typescript-eslint: disable noImplicitAny */
/* typescript-eslint-disable @typescript-eslint/no-implicit-any */
"use client";
import React, { useEffect, useState } from "react";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.png";
import img3 from "../assets/3.webp";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

const ranks = [img1, img2, img3];

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://115.127.156.14:1000/server`);
        const data = await res.json();
        // Do something with the data
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const timeoutId = setInterval(() => {
      fetchData();
    }, 300000);

    // Cleanup to clear the timeout if the component unmounts
    return () => clearInterval(timeoutId);
  }, []);
  // const data = [
  //   {
  //     rank: 1,
  //     teamName: "Tech Titans (Sakib)",
  //     totalDelivered: "$10,640",
  //     deliveryTarget: "$13,000",
  //   },
  //   {
  //     rank: 2,
  //     teamName: "Tech Crafters (Opu)",
  //     totalDelivered: "$13,880",
  //     deliveryTarget: "$13,000",
  //   },
  //   {
  //     rank: 3,
  //     teamName: "Solution Squad (Rafsan)",
  //     totalDelivered: "$7,160",
  //     deliveryTarget: "$13,000",
  //   },
  //   {
  //     rank: 4,
  //     teamName: "Quantum Legends (Sahinur)",
  //     totalDelivered: "$8,080",
  //     deliveryTarget: "$13,000",
  //   },
  //   {
  //     rank: 5,
  //     teamName: "Night Wingers (Shamim)",
  //     totalDelivered: "$7,004",
  //     deliveryTarget: "$8,000",
  //   },
  //   // Add more teams as needed
  // ];

  // bg-[#6bbcfa]

  const handelToSetTime = () => {
    return { shouldRepeat: true };
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#14254f]">
        <ScaleLoader
          color="#6bbcfa"
          height={62}
          margin={5}
          radius={50}
          width={5}
        />
      </div>
    );
  }
  return (
    <div className="bg-[#14254f] w-full h-full flex items-center justify-around">
      <CountdownCircleTimer
        size={700}
        isPlaying
        onComplete={handelToSetTime}
        duration={30}
        colors={["#6bbcfa", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 0]}
      >
        {() => (
          <div className=" text-[#FFD700] flex flex-col justify-center items-center rounded-lg mb-[20px] text-[150px] py-10 px-8 ">
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              data[1]?.totalDelivered
            }
            <br />
            <p className="text-[50px] text-white">Delivery in this Month</p>
          </div>
        )}
      </CountdownCircleTimer>

      <div className="">
        <div className="flex border-[#6bbcfa] border-2 h-[800px] w-[800px] rounded-3xl relative">
          {/* Bottom Overlay */}
          <div className="bg-[#31a6fffb] w-full h-[20px] blur-md absolute bottom-0 left-0 rounded-b-2xl" />

          <div className="grid grid-cols-1 gap-5 overflow-auto w-full md-auto px-5 py-10 scroll-hide ">
            {data?.slice(2, 5)?.map((team: any, index) => (
              <div
                key={team.rank}
                className="flex items-center justify-between bg-[#305fd3] p-4 rounded-md"
              >
                <div className="flex items-center">
                  <div className="text-white font-semibold text-lg">
                    <Image
                      src={`${ranks[index]?.src}`}
                      alt=""
                      width={70}
                      height={70}
                      className="h-[70px] w-[70px]"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-medium ">{team.teamName}</h3>
                    <p className="text-gray-400 text-sm ">
                      Delivered: {team.totalDelivered} / Target:{" "}
                      {team.deliveryTarget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-white font-semibold">
                    {team.totalDelivered}
                  </div>
                </div>
              </div>
            ))}

            {/* Non-ranked Data */}
            {data?.slice(5, data?.length)?.map((team: any, index) => (
              <div
                key={team.rank}
                className="flex items-center justify-between bg-[#305fd3] p-4 rounded-md"
              >
                <div className="flex items-center">
                  <div className="text-white font-semibold text-lg w-[70px] text-center">
                    <p>#{index + 4}</p>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-medium">{team.teamName}</h3>
                    <p className="text-gray-400 text-sm">
                      Delivered: {team.totalDelivered} / Target:{" "}
                      {team.deliveryTarget}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-white font-semibold">
                    {team.totalDelivered}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
