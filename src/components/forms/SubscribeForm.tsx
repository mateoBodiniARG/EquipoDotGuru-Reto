"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";
import { FiRadio } from "react-icons/fi";
import CountUp from "react-countup";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribeSuccess, setIsSubscribeSuccess] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const initialCount = Math.floor(Math.random() * 1000) + 500;
    setSubscriberCount(initialCount);
  }, []);

  const validateEmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid Gmail address");
      return;
    }
    setEmailError("");
    console.log("Subscribing email:", email);
    setIsSubscribeSuccess(true);
    setEmail("");
    setSubscriberCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isSubscribeSuccess && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="flex items-center gap-2 mb-8">
        <FiRadio className="text-red-500 animate-pulse" />{" "}
        <span className="text-white text-2xl font-bold">
          <CountUp start={0} end={subscriberCount} duration={1} separator="," />
          +
        </span>
        <span className="text-white">people subscribed</span>
      </div>

      <Card className="w-[841px] h-[505px] bg-white rounded-[2rem] flex flex-col">
        <CardContent className="flex-grow flex flex-col items-center justify-center space-y-12 pt-12 pb-8 px-8">
          <img src="VectorPlane.png" alt="sendIcon" className="w-14" />
          <h2 className="text-3xl font-bold">SUBSCRIBE</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[500px] flex flex-col items-center space-y-6"
          >
            <div className="w-full">
              <Input
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="border-b border-t-0 border-x-0 rounded-none focus-visible:ring-0 px-0 shadow-none placeholder:text-gray-400 pb-4"
              />
              {emailError && (
                <div className="text-red-500 mt-2">{emailError}</div>
              )}
            </div>
            <div className="mt-auto">
              <Button
                type="submit"
                className="w-[205px] bg-[#EBFF00] hover:bg-[#d4e600] text-black font-bold rounded-full"
              >
                SUBSCRIBE
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isSubscribeSuccess} onOpenChange={setIsSubscribeSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              You have successfully subscribed to{" "}
              <span className="text-black font-bold">EquipoDotGuru</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => window.open("https://equipo.guru/", "_blank")}
              className="bg-[#EBFF00] hover:bg-[#d4e600] text-black "
            >
              Go to Website
            </Button>
            <Button
              onClick={() => setIsSubscribeSuccess(false)}
              variant="outline"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
