import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }

  res.json(profile);
};

export const upsertProfile = async (req, res) => {
  let profile = await Profile.findOne();

  if (!profile) {
    profile = await Profile.create(req.body);
    return res.status(201).json(profile);
  }

  Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
};
