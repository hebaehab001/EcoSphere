import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddAttendBtn({
  eventId,
  isFree,
  userId,
  attenders,
}: {
  eventId: string;
  isFree: boolean;
  attenders?: string[];
  userId: string | "";
}) {
  const router = useRouter();
  const isAttending = attenders?.includes(userId);
  const handleAddEvent = async () => {
    const url = isFree
      ? `/api/events/${eventId}`
      : `/api/events/${eventId}/checkout`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("You have successfully joined the event");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <button
      onClick={handleAddEvent}
      disabled={isAttending}
      className={`flex-1 py-3 capitalize rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition ${
        isAttending ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {isAttending ? "Joined" : "Join Event"}
    </button>
  );
}
