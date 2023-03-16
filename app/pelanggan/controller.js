const Pelanggan = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const pelanggan = await Pelanggan.find();

      res.render("admin/pelanggan/view_pelanggan", {
        pelanggan,
        title: "Mawar Laundry | Pelanggan",
      });
    } catch (error) {
      console.log(error);
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render("admin/pelanggan/tambah_pelanggan", {
        title: "Mawar Laundry | Tambah Pelanggan",
      });
    } catch (error) {
      console.log(error);
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, jenisKelamin, tel, address } = req.body;

      let pelanggan = await Pelanggan({ name, jenisKelamin, tel, address });
      await pelanggan.save();

      res.redirect("/pelanggan");
    } catch (error) {
      console.log(error);
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const pelanggan = await Pelanggan.findOne({ _id: id });

      res.render("admin/pelanggan/ubah_pelanggan", {
        pelanggan,
        title: "Mawar Laundry | Ubah Pelanggan",
      });
    } catch (error) {
      console.log(error);
      res.redirect("/pelanggan");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, jenisKelamin, tel, address } = req.body;

      await Pelanggan.findOneAndUpdate({ _id: id }, { name, jenisKelamin, tel, address });

      res.redirect("/pelanggan");
    } catch (error) {
      console.log(error);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Pelanggan.findOneAndRemove({ _id: id });

      res.redirect("/pelanggan");
    } catch (error) {
      console.log(error);
    }
  },
};
