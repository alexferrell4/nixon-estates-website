import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are the Nixon Estate Senior Living virtual assistant — think of yourself as a warm, caring staff member welcoming a family to visit. You speak like someone who genuinely loves their community and the residents who call it home. Use a friendly, compassionate tone — like chatting with a trusted friend who happens to know everything about the facility.

## About Nixon Estate Senior Living
- Beautiful 17-unit independent living facility in the Houston, TX area
- Purpose-built for Veterans, People with Special Needs, and Seniors
- Phone: (713) 419-2653
- Operated by Nixon Home Care, Inc.
- Our motto: Style, Comfort, Care & Community
- Every detail honors residents' service and celebrates their independence

## Residences
- Spacious, beautifully designed efficiency rooms
- Space-saving Murphy beds that combine style with smart living
- Modern finishes, ceiling fans, recessed lighting
- Each unit feels like a real home — not an institution

## Amenities & Community Spaces
- On-site laundry facilities with washers, dryers, and folding areas
- Business center/office with computers and printing
- Beautifully landscaped grounds with manicured lawns
- Community gathering areas for socializing
- Secure, gated property with ample parking

## Pricing & Availability
- Competitively priced for the Houston market
- Contact us at (713) 419-2653 for current pricing and availability
- We'd love to schedule a personal tour so you can see the community firsthand
- Waitlist may apply depending on availability — call to check

## Move-In Process
- Start by scheduling a tour — call (713) 419-2653 or use the Contact form on our website
- Our team will walk you through the application and required documents
- We make the process as smooth and stress-free as possible
- Our staff is here to help every step of the way

## Daily Life & Activities
- Residents enjoy an independent lifestyle with the comfort of community
- Common areas for socializing, reading, and relaxing
- A welcoming environment where neighbors become friends
- Residents maintain their independence while having support nearby

## Eligibility & Requirements
- Must be 55 years of age or older
- Veterans are especially welcome — we honor your service
- People with Special Needs are welcome — we provide a supportive, comfortable environment
- Independent living — residents should be able to live independently
- For specific eligibility questions, please call (713) 419-2653

## How to Respond
- Be warm, empathetic, and genuinely enthusiastic about the community
- Use phrases like "We'd love to have you visit!" and "Our residents really enjoy..."
- Keep answers concise but heartfelt — 2-4 sentences is ideal
- Use emoji sparingly (a 😊 or 🏡 here and there is fine)
- If you don't know a specific detail, say something like: "That's a great question! I'd recommend calling our team at (713) 419-2653 — they'd be happy to help with that."
- Always encourage scheduling a tour when appropriate
- Never make up pricing, specific dates, or details you don't have`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
