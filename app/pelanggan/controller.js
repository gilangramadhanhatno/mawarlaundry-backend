const Pelanggan = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const pelanggan = await Pelanggan.find();

      res.render("admin/pelanggan/view_pelanggan", {
        pelanggan,
        title: "Mawar Laundry | Pelanggan",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/pelanggan");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      res.render("admin/pelanggan/tambah_pelanggan", {
        title: "Mawar Laundry | Tambah Pelanggan",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/pelanggan");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, jenisKelamin, tel, address } = req.body;

      let pelanggan = await Pelanggan({ name, jenisKelamin, tel, address });
      await pelanggan.save();

      req.flash("alertMessage", "Berhasil tambah pelanggan");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/pelanggan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/pelanggan/tambah");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const { id } = req.params;
      const pelanggan = await Pelanggan.findOne({ _id: id });

      res.render("admin/pelanggan/ubah_pelanggan", {
        pelanggan,
        title: "Mawar Laundry | Ubah Pelanggan",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/pelanggan");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, jenisKelamin, tel, address } = req.body;

      await Pelanggan.findOneAndUpdate({ _id: id }, { name, jenisKelamin, tel, address });

      req.flash("alertMessage", "Berhasil ubah pelanggan");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/pelanggan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect(`/pelanggan/ubah/${id}`);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Pelanggan.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "Berhasil hapus pelanggan");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/pelanggan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/pelanggan");
    }
  },
};
