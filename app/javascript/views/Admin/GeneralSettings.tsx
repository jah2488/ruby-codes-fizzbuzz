import React from "react";
import Button from "../../components/Button";
import Section from "../../components/Section";
import NumberInput from "../../components/NumberInput";
import { AdminProgramChannel } from "../../channels/admin_program_channel";
import { Program } from "../../lib/types/types";

const GeneralSettings = ({ channel, program }) => {
  return (
    <Section name="Debounce Interval (in seconds)">
      <DebounceInterval
        channel={channel}
        program={program}
        debounceInterval={program.settings.debounce_interval}
      />
    </Section>
  );
};

interface DebounceProps {
  debounceInterval: Number;
  channel: AdminProgramChannel;
  program: Program;
}

const DebounceInterval = ({ channel, program, debounceInterval }: DebounceProps) => (
  <div>
    <div className="flex">
      <NumberInput
        handleClick={(e) => channel.setDebounceInterval(Number(e.target.value))}
        value={debounceInterval}
      />
      <Button
        handleClick={() => channel.setDebounceInterval(Number(1))}
        disabled={program.settings.debounce_interval == 1}
        name="1 second"
      />
      <Button
        handleClick={() => channel.setDebounceInterval(Number(2))}
        disabled={program.settings.debounce_interval == 2}
        name="2 seconds"
      />
      <Button
        handleClick={() => channel.setDebounceInterval(Number(3))}
        disabled={program.settings.debounce_interval == 3}
        name="3 seconds"
      />
      <Button
        handleClick={() => channel.setDebounceInterval(Number(4))}
        disabled={program.settings.debounce_interval == 4}
        name="4 seconds"
      />
    </div>
  </div>
);

export default GeneralSettings;
