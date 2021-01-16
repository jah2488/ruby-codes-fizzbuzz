import React from "react";
import Section from "../../components/Section";
import NumberInput from "../../components/NumberInput";
import { AdminProgramChannel } from "../../channels/admin_program_channel";

const GeneralSettings = ({ channel, program }) => {
  return (
    <Section name="Debounce Interval (in seconds)">
      <DebounceInterval channel={channel} debounceInterval={program.settings.debounce_interval} />
    </Section>
  );
};

interface DebounceProps {
  debounceInterval: Number;
  channel: AdminProgramChannel;
}
const DebounceInterval = ({ channel, debounceInterval }: DebounceProps) => (
  <div>
    <div className="flex">
      <NumberInput
        handleClick={(e) => channel.setDebounceInterval(Number(e.target.value))}
        value={debounceInterval}
      />
    </div>
  </div>
);

export default GeneralSettings;