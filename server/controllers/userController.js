const User = require('../models/User');
const Role = require('../models/Role')

class userController{

    async getAllUsers(req, res){
        try{
            const users = await User.find().select('-password');
           
            res.json(users);

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async getUser(req, res){
        try{
            const username = req.params.id;
           
            const user = await User.find({username: username}).select('-password');

            res.json(user);
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndRemove(userId);

            res.json({message: "User is deleted succesfully!"});

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async  blockUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: "Blocked"}, {new: true});

            res.json({message: "User is blocked!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async unblockUser(req, res){
        try{
            const userId = req.params.id;
            await User.findByIdAndUpdate(userId, {blocked: ""}, {new : true});

            res.json({message: "User is unblocked!"})
        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }

    async getAdmin(req, res){
        try{
            const userId = req.params.id;
            const adminRole = await Role.findOne({value: 'admin'});

            const user = await User.findById(userId);
            if(!user.roles.includes(adminRole.value)){
                user.roles.push(adminRole.value);
            }

            await user.save();
            console.log(user);

            res.json({message: "User succesfully get admin role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }


    async removeAdmin(req, res){
        try{
            const userId = req.params.id;
            const adminRole = await Role.findOne({value: 'admin'});

            const user = await User.findById(userId);
            const updatedRoles = user.roles.filter((role) => role !== adminRole.value);
            
            user.roles = updatedRoles;
            
            await user.save();

            res.json({message: "User succesfully get user role!"})

        }catch(e){
            console.log(e);
            res.json({message: "Something went wrong!"})
        }
    }
}
module.exports = new userController;