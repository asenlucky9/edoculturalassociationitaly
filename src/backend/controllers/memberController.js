const Member = require('../models/Member');

// Register a new member
exports.registerMember = async (req, res) => {
  try {
    // Create a new member instance
    const newMember = new Member(req.body);

    // Save the new member to the database
    await newMember.save();
    
    // Respond with the created member data
    res.status(201).json({
      message: "Member registered successfully",
      member: newMember,
    });
  } catch (error) {
    // Respond with a validation error or a general error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", details: error.errors });
    }
    
    res.status(500).json({ message: "Failed to register member", error: error.message });
  }
};

// Get all members
exports.getMembers = async (req, res) => {
  try {
    // Find all members in the database
    const members = await Member.find();
    
    // Respond with the list of members
    res.json({
      message: "Members retrieved successfully",
      members: members,
    });
  } catch (error) {
    // Handle database retrieval errors
    res.status(500).json({ message: "Failed to retrieve members", error: error.message });
  }
};
