const getScoreBasedOnComments = ({ comments = [] } = {}) => {
  const score_list = comments.map((item) => item.score);
  if (score_list.length) {
    const sum = score_list.reduce((prev, curr) => {
      if (!curr) {
        return prev;
      }
      return prev + curr;
    });
    return Math.round(sum / score_list.length);
  } else return "0";
};

export default getScoreBasedOnComments;
