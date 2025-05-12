"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface AuthPromptModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthPromptModal({
  open,
  onClose,
  onSuccess,
}: AuthPromptModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAction = async () => {
    setError("");

      try {
            if (tab === "signup") {
              await signUp(email, password);          // positional args
            } else {
              await signIn(email, password);
            }
            onSuccess();      // only if no error thrown
            onClose();
          } catch (err: unknown) {
            const msg =
              err instanceof Error ? err.message : "Authentication failed";
            setError(msg);
          }

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {tab === "signup" ? "Sign Up & Save 5%!" : "Log In"}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

         <Tabs value={tab} onValueChange={(val) => setTab(val as "signup" | "login")}>
          <TabsList>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <p className="mb-4">
              Create an account now and get 5% off your first booking.
            </p>
          </TabsContent>
          <TabsContent value="login">
            <p className="mb-4">Log in to manage your bookings.</p>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleAction}
            className="w-full py-2 bg-[#BFA15B] text-[#1F1F1F] rounded hover:opacity-90"
          >
            {tab === "signup" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
