import _ from "lodash";

export function getSum(transaction, type) {
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      if (!type) return _.sumBy(objs, "amount");
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();
  return sum;
}

export function getLabels(transaction) {
  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chart_Data(transaction, custom) {
  if (!transaction || transaction.length === 0) {
    return null;
  }

  const labels = ["Investment", "Salary", "Expense"];
  const dataValues = [0, 0, 0];

  transaction.forEach((item) => {
    if (item.type === "Investment") {
      dataValues[0] += item.amount;
    } else if (item.type === "Salary") {
      dataValues[1] += item.amount;
    } else if (item.type === "Expense") {
      dataValues[2] += item.amount;
    }
  });

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
  ];

  const config = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: dataValues,
          backgroundColor: colors,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
