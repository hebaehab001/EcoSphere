"use client";

import React from "react";
import { User } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import { type RecycleFormValues } from "@/frontend/schema/recycle.schema";
import Input from "./UI/formInput";

interface PersonalInfoSectionProps {
  register: UseFormRegister<RecycleFormValues>;
  errors: FieldErrors<RecycleFormValues>;
  handleNumberInput: (e: React.FormEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection = ({
  register,
  errors,
  handleNumberInput,
}: PersonalInfoSectionProps) => {
  const t = useTranslations("RecycleForm.personalInfoSection");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b-2 border-primary-foreground/30">
        <User className="w-6 h-6" />
        <span className="text-sm font-extrabold uppercase">
          {t("title")}
        </span>
      </div>

      <div className="bg-primary-foreground/10 p-8 rounded-3xl border-2 border-primary-foreground/30 outline outline-primary-foreground/20 shadow-lg space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <Input
            label={t("fields.firstName.label")}
            placeholder={t("fields.firstName.placeholder")}
            register={register("firstName")}
            error={errors.firstName?.message}
            required
            icon={User}
          />

          <Input
            label={t("fields.lastName.label")}
            placeholder={t("fields.lastName.placeholder")}
            register={register("lastName")}
            error={errors.lastName?.message}
            required
            icon={User}
          />

          <Input
            label={t("fields.email.label")}
            placeholder={t("fields.email.placeholder")}
            register={register("email")}
            error={errors.email?.message}
            required
            icon={User}
          />

          {/* Phone */}
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-bold uppercase">
              {t("fields.phone.label")} *
            </label>

            <div className="flex gap-4">
              <div className="w-24 flex items-center justify-center rounded-full bg-primary-foreground/20 font-bold text-lg border">
                +20
              </div>

              <div className="flex-1">
                <input
                  {...register("phone")}
                  maxLength={10}
                  onInput={handleNumberInput}
                  placeholder={t("fields.phone.placeholder")}
                  required
                  className="w-full p-3 rounded-full bg-primary-foreground/20 border border-primary-foreground/20 text-primary-foreground placeholder:text-foreground transition-all duration-300 focus:ring-2 focus:border-primary-foreground hover:shadow-lg"
                />

                {errors.phone && (
                  <span className="text-[11px] text-red-100 px-2 py-0.5 bg-red-500/20 rounded-md mt-1 inline-block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
