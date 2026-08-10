import React, { useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm("service_tqmc439", "template_dkizbfj", form.current, {
        publicKey: "LioYY1uKGcefsmdlH",
      })
      .then(
        () => {
          setSubmitStatus("success");
          form.current?.reset();
        },
        () => {
          setSubmitStatus("error");
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="px-4 sm:px-8 md:px-20 py-10 md:py-12 ray-olsen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 md:px-40">
        {/* Left Side */}
        <div className="flex items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Let's Work Together!
          </h2>
        </div>

        {/* Right Side */}
        <div>
          <form
            className="flex flex-col gap-5 md:gap-6"
            ref={form}
            onSubmit={sendEmail}
          >
            {submitStatus === "success" && (
              <div className="p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-green-500/20 animate-slideDown">
                <p className="text-green-400">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-red-500/20 animate-slideDown">
                <p className="text-red-400">
                  There was an error sending your message. Please try again.
                </p>
              </div>
            )}
            {/*Name */}

            <div className="flex flex-col gap-2">
              <label htmlFor="Name" className="text-black">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                id="user_name"
                name="user_name"
                type="user_name"
                required
                className="border border-black px-4 py-3 outline-none focus:border-black w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="user_email"
                type="user_email"
                name="user_email"
                required
                disabled={isSubmitting}
                className="border border-black px-4 py-3 outline-none focus:border-black w-full"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={7}
                disabled={isSubmitting}
                className="border border-black px-4 py-3 outline-none resize-none focus:border-black w-full"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-800 hover:border-zinc-700 disabled:bg-zinc-900 disabled:cursor-not-allowed text-zinc-100 font-medium rounded-lg transition-all duration-300 ease-out animate-slideUp"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="animate-pulse">Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
