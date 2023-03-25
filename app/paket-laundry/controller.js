const PaketLaundry = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      const paketLaundry = await PaketLaundry.find();

      res.render("admin/paket-laundry/view_paket_laundry", {
        paketLaundry,
        title: "Mawar Laundry | Paket Laundry",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry");
    }
  },

  viewCreate: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alertIcon = req.flash("alertIcon");
      const alert = { message: alertMessage, status: alertStatus, icon: alertIcon };

      res.render("admin/paket-laundry/tambah_paket_laundry", {
        title: "Mawar Laundry | Tambah Paket Laundry",
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry");
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, waktuKerja, harga } = req.body;
      let paketLaundry = await PaketLaundry({ name, waktuKerja, harga });

      await paketLaundry.save();

      req.flash("alertMessage", "Berhasil tambah paket laundry");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket-laundry");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry/tambah");
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const paketLaundry = await PaketLaundry.findOne({ _id: id });

      res.render("admin/paket-laundry/ubah_paket_laundry", {
        paketLaundry,
        title: "Laundryin | Ubah Paket Laundry",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry");
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, waktuKerja, harga } = req.body;

      await PaketLaundry.findByIdAndUpdate(
        {
          _id: id,
        },
        { name, waktuKerja, harga }
      );

      req.flash("alertMessage", "Berhasil ubah paket laundry");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket-laundry");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry");
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await PaketLaundry.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil hapus paket laundry");
      req.flash("alertStatus", "success");
      req.flash("alertIcon", "fas fa-check");
      res.redirect("/paket-laundry");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      req.flash("alertIcon", "fas fa-ban");
      res.redirect("/paket-laundry");
    }
  },
};
