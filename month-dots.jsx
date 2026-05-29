import { css } from "uebersicht"

export const refreshFrequency = 1000 * 60 * 60

export const command = "date '+%d %m %Y'"

export const className = css`
  top: 30px;
  right: 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 18px 20px;
  width: 140px;
  font-family: 'Helvetica Neue', sans-serif;

  .month-label {
    font-size: 6px;
    font-weight: 300;
    letter-spacing: 3px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .dots-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .dot.past { background: rgba(255,255,255,0.85); }
  .dot.today { background: #ffffff; box-shadow: 0 0 10px #fff; }
  .dot.future { background: transparent; border: 1px solid rgba(255,255,255,0.2); }

  .stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .stat-item { display: flex; flex-direction: column; align-items: center; }

  .stat-num {
    font-size: 11px;
    font-weight: 200;
    color: rgba(255,255,255,0.9);
    line-height: 1;
  }

  .stat-label {
    font-size: 5px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.3);
    margin-top: 2px;
    text-transform: uppercase;
  }

  .divider { color: rgba(255,255,255,0.15); font-size: 10px; margin-bottom: 6px; }
`

const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"]

export const render = ({ output, error }) => {
  if (error) return <div>Error</div>

  const parts = output.trim().split(" ")
  const today = parseInt(parts[0])
  const month = parseInt(parts[1]) - 1
  const year = parseInt(parts[2])
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dots = []

  for (let d = 1; d <= daysInMonth; d++) {
    const cls = d < today ? "past" : d === today ? "today" : "future"
    dots.push(<span key={d} className={"dot " + cls} />)
  }

  return (
    <div>
      <div className="month-label">{monthNames[month]}</div>
      <div className="dots-grid">{dots}</div>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-num">{today}</span>
          <span className="stat-label">passed</span>
        </div>
        <div className="divider">·</div>
        <div className="stat-item">
          <span className="stat-num">{daysInMonth - today}</span>
          <span className="stat-label">remain</span>
        </div>
      </div>
    </div>
  )
}
