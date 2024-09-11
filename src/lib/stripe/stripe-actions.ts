"use server";

import Stripe from "stripe";
import { stripe } from ".";
import { db } from "../db";

export const subscriptionCreated = async (
  subscription: Stripe.Subscription,
  customerId: string
) => {
  try {
    const agency = await db.agency.findFirst({
      where: {
        customerId,
      },
      include: {
        SubAccount: true,
      },
    });
    if (!agency) {
      throw new Error("could not find any agency to upsert the subscripton");
    }
    const data = {
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      //@ts-ignore
      priceId: subscription.plan.id,
      subscriptionId: subscription.id,
      //@ts-ignore
      plan: subscription.plan.id,
    };
    const res = await db.subscription.upsert({
      where: {
        agencyId: agency.id,
      },
      create: data,
      update: data,
    });
    console.log(`🟢 Created Subscription for ${subscription.id}`);
  } catch (err) {
    console.log(err);
    console.log(`🔴 Error from Create action`, err);
  }
};

export const getConnectAccountProducts = async (stripeAccount: string) => {
  const products = await stripe.products.list(
    {
      limit: 50,
      expand: ["data.default_price"],
    },
    {
      stripeAccount,
    }
  );
  return products.data;
};

export const subscriptionForSub = async (
  subscription: Stripe.Subscription,
  SubAccountId: string
) => {
  try {
    const agency = await db.subAccount.findFirst({
      where: {
        id: SubAccountId,
      },
    });
    if (!agency) {
      throw new Error("could not find any agency to upsert the subscripton");
    }
    // const data = {
    //   active: subscription.status === "active",
    //   agencyId: agency.id,
    //   connectedId:agency.connectAccountId,
    //   currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
    //   //@ts-ignore
    //   priceId: subscription.plan.id,
    //   subscriptionId: subscription.id,
    //   //@ts-ignore
    //   plan: subscription.plan.id,
    // };
    // const res = await db.subscription.upsert({
    //   where: {
    //     agencyId: agency.id,
    //   },
    //   create: data,
    //   update: data,
    // });
    console.log(`🟢 Created Subscription for ${subscription.id}`);
  } catch (err) {
    console.log(err);
    console.log(`🔴 Error from Create action`, err);
  }
};
