"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Recycle, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Package
} from "lucide-react";

// --- Types ---
type MaterialType = "Plastic" | "Glass" | "Metal" | "Paper" | "Cardboard";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    city: string;
    neighborhood: string;
    street: string;
    building: string;
    floor: string;
    apartment: string;
  };
  materialType: MaterialType;
  quantity: number;
};

// --- Helper Data ---
const MATERIAL_UNITS: Record<MaterialType, string> = {
  Plastic: "kg",
  Glass: "items",
  Metal: "kg",
  Paper: "kg",
  Cardboard: "kg",
};

// --- Animations ---
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
};

const Reveal = ({ children, className = "", threshold = 0.12, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // FIX: Using 'amount' instead of 'rootMargin' and 'once' for proper typing
  const inView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- UI Components (Using Standard CSS Variables/Tailwind Classes) ---

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input
    ref={ref}
    className={`flex h-10 w-full rounded-md border-2 border-theme bg-card px-3 py-2 text-sm shadow-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground text-card-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-[var(--primary)] focus-visible:shadow-[0_0_22px_rgba(34,197,94,0.18)] disabled:cursor-not-allowed disabled:opacity-50 transition-all ${props.className || ""}`}
    {...props}
  />
));
Input.displayName = "Input";

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

const Button = ({ children, isLoading, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full hover:opacity-90 bg-primary text-primary-foreground ${className}`}
    disabled={isLoading}
    {...props}
  >
    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
    {children}
  </button>
);

// --- Main Component ---

export default function RecyclingForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>();

  const selectedMaterial = watch("materialType");
  const currentUnit = selectedMaterial ? MATERIAL_UNITS[selectedMaterial] : "";

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);

    // Normalize phone: ensure it has +20 prefix
    let phone = (data.phone || "").toString().trim();
    if (!phone.startsWith("+")) {
      // strip any leading zeros that users may type like 01xxxxx
      phone = phone.replace(/^0+/, "");
      phone = `+20${phone}`;
    }

    const payload = {
      ...data,
      phone,
      fullName: `${data.firstName} ${data.lastName}`,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="relative w-full bg-background text-card-foreground py-16 md:py-24 overflow-hidden font-sans">
      {/* Background Decor - subtle primary tint and decorative icons */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 blur-2xl" style={{ backgroundColor: 'var(--primary)', opacity: 0.06 }} />
        <Recycle className="absolute top-10 left-10 w-64 h-64 text-primary rotate-12 opacity-80" />
        <Recycle className="absolute bottom-10 right-10 w-96 h-96 text-primary -rotate-12 opacity-80" />
      </div>

      {/* Main Container - Adjusted to 80% width as requested */}
      <div className="mx-auto w-[80%] px-4 md:px-6 relative z-10">
        <Reveal>
          <div className="w-full space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-4">
              <span className="text-xl font-bold tracking-widest uppercase flex items-center justify-center gap-2 text-primary">
                <Recycle className="w-6 h-6" /> Recycle Now
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Start Your <span className="text-primary">Recycling</span> Journey
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Schedule a pickup or drop-off request. Fill out the details below and we&apos;ll handle the rest.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 md:p-8" style={{ boxShadow: '0 10px 30px rgba(34,197,94,0.06)' }}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                
                {/* Section: Personal Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground/90 border-b border-border pb-3">
                    <User className="w-6 h-6 text-primary" /> Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <div className="relative">
                        <Input 
                          placeholder="First name" 
                          {...register("firstName", { required: "First name is required" })} 
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <div className="relative">
                        <Input 
                          placeholder="Last name" 
                          {...register("lastName", { required: "Last name is required" })} 
                          className="pl-10"
                        />
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Email</Label>
                      <div className="relative">
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                          })} 
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Phone Number</Label>
                      <div className="relative flex items-center">
                        <span className="inline-flex items-center px-3 rounded-l-md border-2 border-theme bg-card text-sm text-card-foreground">
                          <Phone className="mr-2 h-4 w-4 text-card-foreground" />
                          +20
                        </span>
                        <Input 
                          placeholder="1XXXXXXXXX" 
                          {...register("phone", { required: "Phone is required" })} 
                          className="rounded-l-none flex-1"
                        />
                      </div>
                      {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Section: Address */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground/90 border-b border-border pb-3">
                    <MapPin className="w-6 h-6 text-primary" /> Collection Address
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-2">
                      <Label>City</Label>
                      <Input placeholder="Enter city" {...register("address.city", { required: "City is required" })} />
                      {errors.address?.city && <p className="text-destructive text-xs">{errors.address.city.message}</p>}
                    </div>

                    <div className="space-y-2 col-span-2 md:col-span-2">
                      <Label>Neighborhood</Label>
                      <Input placeholder="Enter neighborhood" {...register("address.neighborhood", { required: "Required" })} />
                      {errors.address?.neighborhood && <p className="text-destructive text-xs">{errors.address.neighborhood.message}</p>}
                    </div>

                    <div className="space-y-2 col-span-2 md:col-span-3">
                      <Label>Street Address</Label>
                      <Input placeholder="Enter street address" {...register("address.street", { required: "Street is required" })} />
                      {errors.address?.street && <p className="text-destructive text-xs">{errors.address.street.message}</p>}
                    </div>

                    <div className="space-y-2 col-span-1">
                       <Label>Bldg No.</Label>
                       <Input placeholder="Building" {...register("address.building", { required: "Required" })} />
                    </div>

                    <div className="space-y-2 col-span-1">
                       <Label>Floor</Label>
                       <Input placeholder="Floor" {...register("address.floor")} />
                    </div>

                    <div className="space-y-2 col-span-1">
                       <Label>Apt No.</Label>
                       <Input placeholder="Apartment" {...register("address.apartment", { required: "Required" })} />
                    </div>
                  </div>
                </div>

                {/* Section: Material Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground/90 border-b border-border pb-3">
                    <Package className="w-6 h-6 text-primary" /> Recycling Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Material Type</Label>
                      <div className="relative">
                        <select 
                          // Updated select styling to match Input component's shadow and focus effects
                          className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm shadow-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary dark:focus-visible:shadow-[0_0_15px_rgba(34,197,94,0.4)] disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                          {...register("materialType", { required: "Material type is required" })}
                        >
                          <option value="">Select material type</option>
                          <option value="Plastic">Plastic</option>
                          <option value="Glass">Glass</option>
                          <option value="Metal">Metal</option>
                          <option value="Paper">Paper</option>
                          <option value="Cardboard">Cardboard</option>
                        </select>
                        <Recycle className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {errors.materialType && <p className="text-destructive text-xs">{errors.materialType.message}</p>}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedMaterial && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-2"
                        >
                          <Label>Estimated Quantity ({currentUnit})</Label>
                          <div className="relative">
                            <Input 
                              type="number" 
                              placeholder="Enter quantity" 
                              min="1"
                              {...register("quantity", { required: "Quantity is required", min: 1, valueAsNumber: true })}
                              className="pr-12"
                              onKeyDown={(e) => {
                                if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                                  e.preventDefault();
                                }
                              }}
                            />
                            <div className="absolute right-3 top-2.5 text-sm text-muted-foreground font-medium pointer-events-none">
                              {currentUnit}
                            </div>
                          </div>
                          {errors.quantity && <p className="text-destructive text-xs">{errors.quantity.message}</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto md:px-12 md:ml-auto block shadow-lg shadow-primary/25 h-12 text-lg">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Toaster / Notification */}
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-lg shadow-2xl border flex items-center gap-3 max-w-sm ${
              status === "success" 
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300" 
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
            }`}
          >
            <div className={`p-2 rounded-full ${status === "success" ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"}`}>
              {status === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {status === "success" ? "Request Submitted!" : "Submission Failed"}
              </h4>
              <p className="text-xs opacity-90">
                {status === "success" 
                  ? "We've received your recycling request. Our team will contact you shortly." 
                  : "Something went wrong. Please try again later."}
              </p>
            </div>
            <button 
              onClick={() => setStatus("idle")}
              className="ml-auto hover:bg-black/5 p-1 rounded-md transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}